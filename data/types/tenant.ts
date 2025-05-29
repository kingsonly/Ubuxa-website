export type Tenant = {
  id: string
  companyName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  demoDate?: string
  contactPerson: string
  status: string
  monthlyFee?: number
  registrationSent?: boolean
  registrationCompleted?: boolean
  activationStatus?: string
  moreInfo?: string
  createdAt?: string
  paymentProvider?: string
}

export enum TenantStatus {
  UNPROCESSED = "UNPROCESSED",
  PENDING = "PENDING", 
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  SET_DEMO_DATE = "SET_DEMO_DATE",
  ONBOARD_PAYMENT_DETAILS = "ONBOARD_PAYMENT_DETAILS",
  ONBOARD_CUSTOMIZATION = "ONBOARD_CUSTOMIZATION",
  ONBOARD_ROLE = "ONBOARD_ROLE",
  ONBOARD_TEAMMATE = "ONBOARD_TEAMMATE",
  DEACTIVATED = "DEACTIVATED"
}