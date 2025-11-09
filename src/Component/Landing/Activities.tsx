'use client'
import Image from "next/image"
import camel from '@/assests/dumba.png'
import hillCar from '@/assests/hill-car.jpg'
import tea from '@/assests/tea.jpg'
import cofee from '@/assests/cofee.png'
import bellyDance from '@/assests/belly-dance.jpg'
import culture from '@/assests/culture.jpg'
import camping from '@/assests/camping.png'
import nightCamp from '@/assests/night-camp.jpg'
import sandRide from '@/assests/sand-ride.jpg'
import bikeRide from '@/assests/bike-ride.jpg'
import { useTranslations } from "next-intl"
const activities = [
  {
    id: 1,
    title: "Dune Bashing",
    image:hillCar,
  },
  {
    id: 2,
    title: "Camel Ride",
    image: camel,
  },
  {
    id: 3,
    title: "Quad Biking",
    image:bikeRide,
  },
  {
    id: 4,
    title: "Dune Buggy Ride",
    image:sandRide,
  },
  {
    id: 5,
    title: "Tea, Coffee, & Soft Drinks",
    image:tea,
  },
  {
    id: 6,
    title: "Henna Tattoos",
    image: culture,
  },
  {
    id: 7,
    title: "Fire Show in the Desert",
    image: camping,
  },
  {
    id: 8,
    title: "Arabic Costumes",
    image:culture,
  },
  {
    id: 9,
    title: "Camping",
    image: nightCamp,
  },

  {
    id: 11,
    title: "Sand-Boarding",
    image:sandRide,
  },
  {
    id: 12,
    title: "Belly Dance Show",
    image:bellyDance,
  },

  {
    id: 14,
    title: "Tea, Coffee, & Soft Drinks",
    image:cofee,
  },

]
export default function DesertSafariActivities() {
  const title = useTranslations("home");
  return (
    <div className="max-w-7xl px-5 mx-auto mb-5 font-nunito">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-foreground">
       {title("activitiesTitle")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-sm md:text-base font-medium text-card-foreground text-center">{activity.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
