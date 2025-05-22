import { Calendar, CheckCircle, Mail, User, Zap } from "lucide-react"

export function TenantTimeline({ tenant, formatDate }: { tenant: any; formatDate: (date: string) => string }) {
  return (
    <>
      <TimelineItem icon={<Calendar />} label="Demo scheduled" value={formatDate(tenant.demoDate)} />

      {tenant.status.toLowerCase() === "processed" && (
        <TimelineItem
          icon={<CheckCircle />}
          label="Tenant processed"
          value={`Monthly fee set to $${tenant.monthlyFee}`}
        />
      )}

      {tenant.registrationSent && (
        <TimelineItem icon={<Mail />} label="Registration email sent" value={`Sent to ${tenant.email}`} />
      )}

      {tenant.registrationCompleted && (
        <TimelineItem icon={<User />} label="Registration completed" value="Ready for activation" />
      )}

      {tenant.activationStatus === "active" && (
        <TimelineItem icon={<Zap />} label="Tenant activated" value={formatDate(tenant.activationDate)} />
      )}
    </>
  )
}

function TimelineItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start">
      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">{icon}</div>
      <div>
        <p className="text-sm text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{value}</p>
      </div>
    </div>
  )
}
