import image1 from '@/assets/images/476661495_122098565132803267_9120042930914839808_n.jpg'
import image2 from '@/assets/images/480306378_122099283224803267_3726667716824493123_n.jpg'
import image3 from '@/assets/images/483993115_122099172674803267_32722083050686369_n.jpg'
import image4 from '@/assets/images/494461945_122118448250803267_7746606753476484507_n.jpg'

const galleryImages = [
  { src: image1, alt: 'Instalaciones Podoskin Solutions' },
  { src: image2, alt: 'Tratamiento profesional de podología' },
  { src: image3, alt: 'Equipamiento especializado' },
  { src: image4, alt: 'Atención personalizada al paciente' }
]

export function GallerySection() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Nuestras Instalaciones
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Conoce nuestro espacio diseñado para tu comodidad con equipamiento profesional y tecnología de vanguardia
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-background">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
