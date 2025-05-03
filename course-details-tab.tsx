"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Course } from "@/store/course/interface/CourseInterface"
import {
  Calendar,
  Clock,
  Award,
  Tag,
  CheckCircle,
  XCircle,
  FileQuestion,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  FileUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useApiCall } from "@/utils/useApiCall"
import { updateCourseDetails } from "@/store/course/CourseSlice"
import { useDispatch, useSelector } from "react-redux"

interface CourseDetailsTabProps {
  course: Course
  onCourseUpdated?: (updatedCourse: Course) => void
}

// Form schema for course update
const courseUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  withDiscount: z.boolean(),
  withCertificate: z.boolean(),
  status: z.boolean(),
  discountPrice: z.string().optional(),
  file: z.instanceof(FileList).optional(),
  enrollmentQuestions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        required: z.boolean(),
        type: z.string().min(1, "Question type is required"),
        options: z.array(z.string()).optional(),
      }),
    )
    .optional(),
})

export default function CourseDetailsTab({ course: initialCourse, onCourseUpdated }: CourseDetailsTabProps) {
  const { apiCall } = useApiCall()
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  // Use local state to track the current course data
  const [currentCourse, setCurrentCourse] = useState<Course>(initialCourse)

  // Get the course from Redux store
  const courseFromRedux = useSelector((state: any) =>
    state.courses.courses.find((c: Course) => c.id === initialCourse.id),
  )

  // Update local state when Redux store changes
  useEffect(() => {
    if (courseFromRedux) {
      setCurrentCourse(courseFromRedux)
    }
  }, [courseFromRedux])

  const [filePreview, setFilePreview] = useState<string | null>(currentCourse.file)

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Parse enrollment questions if they exist
  const enrollmentQuestions = currentCourse.enrollmentQuestions
    ? typeof currentCourse.enrollmentQuestions === "string"
      ? JSON.parse(currentCourse.enrollmentQuestions)
      : currentCourse.enrollmentQuestions
    : []

  // Set up the form
  const form = useForm<z.infer<typeof courseUpdateSchema>>({
    resolver: zodResolver(courseUpdateSchema),
    defaultValues: {
      title: currentCourse.title,
      description: currentCourse.description,
      price: currentCourse.price,
      withDiscount: currentCourse.withDiscount,
      withCertificate: currentCourse.withCertificate,
      status: currentCourse.status,
      discountPrice: currentCourse.discountPrice || "0",
      enrollmentQuestions: enrollmentQuestions,
    },
  })

  // Update form values when currentCourse changes
  useEffect(() => {
    form.reset({
      title: currentCourse.title,
      description: currentCourse.description,
      price: currentCourse.price,
      withDiscount: currentCourse.withDiscount,
      withCertificate: currentCourse.withCertificate,
      status: currentCourse.status,
      discountPrice: currentCourse.discountPrice || "0",
      enrollmentQuestions: enrollmentQuestions,
    })
    setFilePreview(currentCourse.file)
  }, [currentCourse, form.reset])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(file)
      setFilePreview(fileUrl)
    }
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Append other fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "file" && key !== "enrollmentQuestions" && key !== "discountPrice") {
        // Convert booleans to string
        if (typeof value === "boolean") {
          formData.append(key, String(value))
        }
        // Convert numbers or strings
        else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value))
        }
        // Skip objects/arrays/null/undefined
      }
    })

    //Handle discount data separately
    if (data.withDiscount) {
      if (data.discountPrice) {
        formData.append("discountPrice", Number.parseFloat(data.discountPrice).toString())
      }
    }

    // Handle enrollment questions separately
    if (data.enrollmentQuestions) {
      formData.append(
        "enrollmentQuestions",
        typeof currentCourse.enrollmentQuestions === "string"
          ? JSON.stringify(data.enrollmentQuestions)
          : JSON.stringify(data.enrollmentQuestions),
      )
    }

    // Add file if present
    if (data.file instanceof FileList && data.file.length > 0) {
      const file = data.file[0]
      if (file.type.startsWith("image/")) {
        formData.append("withTrailer", "false")
      } else if (file.type.startsWith("video/")) {
        formData.append("withTrailer", "true")
      } else {
        formData.append("withTrailer", "false")
      }
      formData.append("file", data.file[0])
    }

    try {
      const res = await apiCall({
        endpoint: `/courses/update/${currentCourse.id}`,
        method: "patch",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

      // Update Redux store
      dispatch(updateCourseDetails(res.data))

      // Update local state
      setCurrentCourse(res.data)

      // Call the callback if provided
      if (onCourseUpdated) onCourseUpdated(res.data)

      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update course:", err)
    }
  }

  // Add enrollment question
  const addEnrollmentQuestion = () => {
    const currentQuestions = form.getValues().enrollmentQuestions || []
    form.setValue("enrollmentQuestions", [
      ...currentQuestions,
      { question: "", required: false, type: "text", options: [] },
    ])
  }

  // Remove enrollment question
  const removeEnrollmentQuestion = (index: number) => {
    const currentQuestions = form.getValues().enrollmentQuestions || []
    const newQuestions = [...currentQuestions]
    newQuestions.splice(index, 1)
    form.setValue("enrollmentQuestions", newQuestions)
  }

  // Add option to a question
  const addOptionToQuestion = (questionIndex: number) => {
    const currentQuestions = form.getValues().enrollmentQuestions || []
    const questionToUpdate = currentQuestions[questionIndex]

    if (!questionToUpdate.options) {
      questionToUpdate.options = []
    }

    questionToUpdate.options.push("")
    form.setValue(`enrollmentQuestions.${questionIndex}.options`, questionToUpdate.options)
  }

  // Remove option from a question
  const removeOptionFromQuestion = (questionIndex: number, optionIndex: number) => {
    const currentQuestions = form.getValues().enrollmentQuestions || []
    const questionToUpdate = currentQuestions[questionIndex]

    if (questionToUpdate.options) {
      questionToUpdate.options.splice(optionIndex, 1)
      form.setValue(`enrollmentQuestions.${questionIndex}.options`, questionToUpdate.options)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Course Details</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-purple-400 border-purple-400 hover:bg-purple-500/10"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
            <span>Edit Details</span>
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="text-gray-400 border-gray-600 hover:bg-gray-700"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              onClick={form.handleSubmit(onSubmit)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Basic Details */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter course title"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter course description"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Course Image / Video</h2>

                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Upload Course Image / Video
                            <span className="text-red-300 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center justify-center w-full">
                              <label
                                htmlFor="update-file"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-600 hover:border-purple-400 bg-gray-700/50"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <FileUp className="w-8 h-8 mb-3 text-purple-300" />
                                  <p className="mb-2 text-sm text-gray-200">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-300">JPG, PNG, WebP, MP4, WebM or MOV (MAX. 5MB)</p>
                                </div>
                                <input
                                  id="update-file"
                                  type="file"
                                  accept="video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp"
                                  className="hidden"
                                  {...fieldProps}
                                  onChange={(e) => {
                                    onChange(e.target.files)
                                    handleFileChange(e)
                                  }}
                                />
                              </label>
                            </div>
                          </FormControl>
                          {filePreview && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-300 mb-2">File selected:</p>
                              <div className="flex items-center p-2 bg-gray-700/50 rounded-md">
                                <FileUp className="w-5 h-5 mr-2 text-purple-300" />
                                <span className="text-sm text-gray-200 truncate">
                                  {value && (value as FileList)[0]?.name
                                    ? (value as FileList)[0]?.name
                                    : "Current file"}
                                </span>
                              </div>
                            </div>
                          )}
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Course Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="withCertificate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                        <div>
                          <FormLabel className="text-white">Certificate</FormLabel>
                          <p className="text-xs text-gray-400">Will students receive a certificate?</p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                        <div>
                          <FormLabel className="text-white">Publish</FormLabel>
                          <p className="text-xs text-gray-400">Is this course currently visible in the course store?</p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Pricing</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Price (₦)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter price"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="withDiscount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                        <div>
                          <FormLabel className="text-white">Enable Discount</FormLabel>
                          <p className="text-xs text-gray-400">Apply a discount to this course?</p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("withDiscount") && (
                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Discount Price (₦)</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter discount price"
                              {...field}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Questions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileQuestion className="h-5 w-5 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Enrollment Questions</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEnrollmentQuestion}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {form.watch("enrollmentQuestions")?.map((_, index) => (
                    <Card key={index} className="bg-gray-700/30 border-gray-600">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <FormField
                            control={form.control}
                            name={`enrollmentQuestions.${index}.question`}
                            render={({ field }) => (
                              <FormItem className="flex-grow mr-2">
                                <FormLabel className="text-white">Question</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter question"
                                    {...field}
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEnrollmentQuestion(index)}
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20 mt-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`enrollmentQuestions.${index}.type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Question Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                      <SelectValue placeholder="Select question type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`enrollmentQuestions.${index}.required`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                <FormLabel className="text-white">Required</FormLabel>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {(form.watch(`enrollmentQuestions.${index}.type`) === "multiple_choice" ||
                          form.watch(`enrollmentQuestions.${index}.type`) === "checkbox") && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-white">Options</FormLabel>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addOptionToQuestion(index)}
                                className="border-blue-500 text-blue-400 hover:bg-blue-500/20 h-7 text-xs"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Option
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {form.watch(`enrollmentQuestions.${index}.options`)?.map((_, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <FormField
                                    control={form.control}
                                    name={`enrollmentQuestions.${index}.options.${optionIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-grow">
                                        <FormControl>
                                          <Input
                                            placeholder={`Option ${optionIndex + 1}`}
                                            {...field}
                                            className="bg-gray-800 border-gray-700 text-white"
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeOptionFromQuestion(index, optionIndex)}
                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {(!form.watch("enrollmentQuestions") || form.watch("enrollmentQuestions")?.length === 0) && (
                    <div className="text-center py-4 text-gray-400">No enrollment questions added.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                className="text-gray-400 border-gray-600 hover:bg-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          {/* Description */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{currentCourse.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Course Features */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Course Features</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Created On</p>
                    <p className="text-white">{formatDate(currentCourse.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-white">{formatDate(currentCourse.updatedAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Course Type</p>
                    <p className="text-white capitalize">{currentCourse.courseType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Certificate</p>
                    <p className="text-white">{currentCourse.withCertificate ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  {currentCourse.withTrailer ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="text-gray-300">Course Trailer</span>
                </div>

                <div className="flex items-center space-x-2">
                  {currentCourse.withBatch ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="text-gray-300">Batch Enrollment</span>
                </div>

                <div className="flex items-center space-x-2">
                  {currentCourse.withDiscount ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="text-gray-300">Discount Available</span>
                </div>

                <div className="flex items-center space-x-2">
                  {currentCourse.status ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="text-gray-300">Active Status</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Pricing</h3>

              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-400">Regular Price</p>
                  <p
                    className={`text-xl font-bold ${currentCourse.withDiscount ? "line-through text-gray-500" : "text-white"}`}
                  >
                    {Number.parseFloat(currentCourse.price) > 0
                      ? `₦${Number.parseFloat(currentCourse.price).toLocaleString()}`
                      : "Free"}
                  </p>
                </div>

                {currentCourse.withDiscount && currentCourse.discountPrice && (
                  <div>
                    <p className="text-sm text-gray-400">Discount Price</p>
                    <p className="text-xl font-bold text-green-400">
                      ₦{Number.parseFloat(currentCourse.discountPrice).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {Math.round(
                        (1 - Number.parseFloat(currentCourse.discountPrice) / Number.parseFloat(currentCourse.price)) *
                          100,
                      )}
                      % off
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Questions */}
          {enrollmentQuestions && enrollmentQuestions.length > 0 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileQuestion className="h-5 w-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Enrollment Questions</h3>
                </div>

                <div className="space-y-4">
                  {Array.isArray(enrollmentQuestions) &&
                    enrollmentQuestions.map((q: any, index: number) => (
                      <div key={index} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between">
                          <p className="font-medium text-white">{q.question}</p>
                          {q.required && (
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">Required</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Type: {q.type}</p>

                        {(q.type === "multiple_choice" || q.type === "checkbox") && q.options && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-400 mb-1">Options:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {q.options.map((option: string, i: number) => (
                                <div key={i} className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded">
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
