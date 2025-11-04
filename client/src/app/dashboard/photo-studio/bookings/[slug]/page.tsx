"use client"
import DashboardBookingDetails from "@/components/dashbord/DashboardBookingDetails";
import { useGetBookingByIdQuery } from "@/redux/services/booking/booking.api";

interface PageProps {
  params: { bookingId: string };
}
export default function Page({ params }: PageProps) {
  // const [message, setMessage] = useState("");
  const { bookingId } = params
  const { data: booking, isLoading, } = useGetBookingByIdQuery(bookingId, {
    skip: !bookingId, // avoid query if id is undefined/null
  });


  if (isLoading) return <p>Loading booking details...</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <section className='w-full pt-24'>
      <DashboardBookingDetails booking={booking} isLoading={isLoading} />
    </section>
  );
}
