import { Calendar, CheckCircle, Mail, User, Zap, CreditCard, Palette, Users, Shield } from "lucide-react"
import { Tenant, TenantStatus } from "@/data/types/tenant"

export function TenantTimeline({ tenant, formatDate }: { tenant: Tenant; formatDate: (date: string) => string }) {
  const status = tenant.status.toUpperCase();

  return (
    <>
      {status === TenantStatus.UNPROCESSED && (
        <TimelineItem
          icon={<Calendar />}
          label="Unprocessed"
          value={formatDate(tenant.createdAt!)}
        />
      )}

      {status === TenantStatus.SET_DEMO_DATE && (
        <TimelineItem
          icon={<Calendar />}
          label="Demo Date Set"
          value={formatDate(tenant.demoDate)}
        />
      )}

      {status === TenantStatus.PENDING && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<Mail />}
            label="Payment Link Sent"
            value={`Sent to ${tenant.email}`}
          />
        </>
      )}

      {status === TenantStatus.ONBOARD_PAYMENT_DETAILS && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
        </>
      )}

      {status === TenantStatus.ONBOARD_CUSTOMIZATION && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
          <TimelineItem
            icon={<Palette />}
            label="Branding Customized"
            value="Logo and colors uploaded"
          />
        </>
      )}

      {status === TenantStatus.ONBOARD_ROLE && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
          <TimelineItem
            icon={<Palette />}
            label="Branding Customized"
            value="Logo and colors uploaded"
          />
          <TimelineItem
            icon={<Shield />}
            label="Role Created"
            value={`Role: ${tenant.roleName}`}
          />
        </>
      )}

      {status === TenantStatus.ONBOARD_TEAMMATE && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
          <TimelineItem
            icon={<Palette />}
            label="Branding Customized"
            value="Logo and colors uploaded"
          />
          <TimelineItem
            icon={<Shield />}
            label="Role Created"
            value={`Role: ${tenant.roleName}`}
          />
          <TimelineItem
            icon={<Users />}
            label="Teammate Added"
            value={`Added ${tenant.teammateName} with ${tenant.teammateRole}`}
          />
        </>
      )}

      {status === TenantStatus.ACTIVE && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
          <TimelineItem
            icon={<Palette />}
            label="Branding Customized"
            value="Logo and colors uploaded"
          />
          <TimelineItem
            icon={<Shield />}
            label="Role Created"
            value={`Role: ${tenant.roleName}`}
          />
          <TimelineItem
            icon={<Users />}
            label="Teammate Added"
            value={`Added ${tenant.teammateName} with ${tenant.teammateRole}`}
          />
          <TimelineItem
            icon={<Zap />}
            label="Tenant Activated"
            value={formatDate(tenant.activationDate)}
          />
        </>
      )}

      {status === TenantStatus.REJECTED && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<Mail />}
            label="Rejected"
            value={`Reason: ${tenant.rejectionReason}`}
          />
        </>
      )}

      {status === TenantStatus.DEACTIVATED && (
        <>
          <TimelineItem
            icon={<Calendar />}
            label="Demo Date Set"
            value={formatDate(tenant.demoDate)}
          />
          <TimelineItem
            icon={<CheckCircle />}
            label="Demo Completed"
            value={`Monthly fee set to $${tenant.monthlyFee}`}
          />
          <TimelineItem
            icon={<CreditCard />}
            label="Payment Details Set"
            value={`Payment provider: ${tenant.paymentProvider}`}
          />
          <TimelineItem
            icon={<Palette />}
            label="Branding Customized"
            value="Logo and colors uploaded"
          />
          <TimelineItem
            icon={<Shield />}
            label="Role Created"
            value={`Role: ${tenant.roleName}`}
          />
          <TimelineItem
            icon={<Users />}
            label="Teammate Added"
            value={`Added ${tenant.teammateName} with ${tenant.teammateRole}`}
          />
          <TimelineItem
            icon={<Zap />}
            label="Tenant Activated"
            value={formatDate(tenant.activationDate)}
          />
          <TimelineItem
            icon={<Mail />}
            label="Deactivated"
            value={`Reason: ${tenant.deactivationReason}`}
          />
        </>
      )}
    </>
  )
}

function TimelineItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 border-b last:border-b-0">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="font-medium text-slate-900">{label}</div>
        <div className="text-slate-500 text-sm">{value}</div>
      </div>
    </div>
  )
}
