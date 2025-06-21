"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    id: 1,
    title: "សន្នាក់ឥណទាន",
    subtitle: "ការផ្តល់ឥណទាន",
    description: "ផលិតផល ប្រាក់",
    image: "https://as2.ftcdn.net/jpg/04/46/40/03/1000_F_446400396_3jm1TmgnSve7oOZM0wyQxSncWMJgkul0.jpg",
  },
  {
    id: 2,
    title: "Digital Banking",
    subtitle: "Modern Solutions",
    description: "Technology Services",
    image: "https://as2.ftcdn.net/jpg/05/40/57/79/1000_F_540577965_B8fix0yUJJ1SlYeU77v9f3fC7SDJ8TOn.jpg",
  },
  {
    id: 3,
    title: "Customer Service",
    subtitle: "24/7 Support",
    description: "Always Here for You",
    image: "https://m2p-website-file.s3.ap-south-1.amazonaws.com/m2p-website-file/marketing-cms/m2p-blog/2023/10/Core-Banking-Solution-Blog_Blog_1B_2000X1251-copy-3-2.webp",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)

  return (
    <div className="relative h-[500px] overflow-hidden shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="min-w-full relative h-full">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center text-white px-4 max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{item.title}</h2>
                <p className="text-lg sm:text-2xl font-medium mb-2 drop-shadow">{item.subtitle}</p>
                <p className="text-sm sm:text-lg text-white/80 drop-shadow">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            } transition-colors`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
