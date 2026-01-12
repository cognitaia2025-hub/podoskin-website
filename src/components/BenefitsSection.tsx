import { Certificate, Laptop, Heart, MapPin } from '@phosphor-icons/react'
import { benefits } from '@/lib/data'

const iconMap = {
  Certificate,
  Laptop,
  Heart,
  MapPin
}

export function BenefitsSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Nos distinguimos por nuestra dedicación a la excelencia y al cuidado de tus pies
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent transition-all duration-200 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={32} weight="duotone" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
