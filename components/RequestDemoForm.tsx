"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import {
  RequestDemoFormInput,
  requestDemoSchema,
} from "../schemas/requestDemoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import api from "@/app/lib/axios";

export default function RequestDemoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RequestDemoFormInput>({
    resolver: zodResolver(requestDemoSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: RequestDemoFormInput) => {
    try {
      await api.post("/api/v1/tenants", data);
      toast({
        title: "Demo requested successfully!",
        description: "Our team will contact you shortly.",
        variant: "success",
      });
      reset();
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([field, message]) => {
          if (typeof message === "string") {
            setError(field as keyof RequestDemoFormInput, { message });
          } else if (Array.isArray(message)) {
            setError(field as keyof RequestDemoFormInput, {
              message: message[0],
            });
          }
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
      }
      // toast({
      //   title: "Error",
      //   description: "Something went wrong. Please try again.",
      //   variant: "destructive",
      // })
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-16 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Energy Business?
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Request a personalized demo and discover how Ubuxa can
                  streamline your operations.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">
                      Custom tailored subscription plans
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">
                      Direct payment gateway integration
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">
                      Comprehensive onboarding support
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/30"></div>
              <div className="absolute top-10 -left-16 h-40 w-40 rounded-full bg-blue-700/30"></div>
            </div>

            <div className="md:w-1/2 p-10 md:p-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Request Your Demo
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="John"
                      {...register("firstName")}
                    />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Energy Solutions Inc."
                    {...register("companyName")}
                  />
                  {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="john@energysolutions.com"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you most interested in?
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    {...register("interest")}
                  >
                    <option value="">Select an option</option>
                    <option value="sales">Sales Management</option>
                    <option value="inventory">Inventory Management</option>
                    <option value="tokens">Token Generation</option>
                    <option value="agents">Agent Management</option>
                    <option value="all">Full Platform</option>
                  </select>
                  {errors.interest && <p className="text-sm text-red-500 mt-1">{errors.interest.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 h-32"
                    placeholder="Tell us about your business needs..."
                    {...register("moreInfo")}
                  ></textarea>
                  {errors.moreInfo && <p className="text-sm text-red-500 mt-1">{errors.moreInfo.message}</p>}
                </div>

                <Button
                  className={`w-full ${isSubmitting ? "bg-white" : "bg-blue-600"} ${isSubmitting ? "hover:bg-white" : "hover:bg-blue-700"}  text-white py-4 text-lg`}
                  type={isSubmitting ? "button" : "submit"}

                >
                  {isSubmitting ? <Image alt="loader" src="/images/loader.gif" width={100} height={100} /> : "Request Demo"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
