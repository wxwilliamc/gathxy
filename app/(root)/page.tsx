import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              "Your Premier Platform for Hosting, Connecting, and Celebrating Events!"
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              At Gathxy, we provide the ideal platform for bringing people together to host, connect, and celebrate their events. Whether it's a gathering of friends, a professional meetup, or a special occasion, our platform offers the perfect space to unite and commemorate these moments.
            </p>

            <Button size='lg' asChild className="button w-full sm:w-fit gradient-button">
              <Link href='#events'>
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            alt="event_image"
            src='https://i.pinimg.com/564x/bf/b3/4e/bfb34ec6b4d27a00181f9a5695bbb4fd.jpg'
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center rounded-full"
          />
        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Preferred Platform for <br/> Countless Unforgettable Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* Search */}
          {/* Category Filter */}
        </div>
      </section>
    </>
  )
}
