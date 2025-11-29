import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import LinkButton from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 bg-black text-white'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-lg'>Sorry, this page does not exist.</p>
      <LinkButton
        href='/web'
        icon={<RedirectArrowWhite />}
        iconPosition='right'
        text='Go back home'
        size='lg'
      />
    </div>
  );
}
