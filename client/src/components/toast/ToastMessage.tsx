import { ToastContentProps } from "react-toastify";

// export default function App() {
//     const notify = () => {
//         toast(WithAvatar, {
//             closeButton: false,
//             progress: 0.7,
//             className:
//                 'shadow-lg overflow-visible scale-100 ring-1 ring-black/5 rounded-xl flex items-center gap-6 bg-slate-800 highlight-white/5',
//         });

//         toast(CustomNotification, {
//             data: {
//                 title: 'Oh Snap!',
//                 content: 'Something went wrong',
//             },
//             progress: 0.2,
//             ariaLabel: 'Something went wrong',
//             autoClose: false,
//         });

//         toast.error(CustomNotification, {
//             data: {
//                 title: 'Oh Snap!',
//                 content: 'Something went wrong',
//             },
//             ariaLabel: 'Something went wrong',
//             autoClose: false,
//             progress: 0.3,
//             icon: false,
//             theme: 'colored',
//         });

//         toast(WithActions, {
//             data: {
//                 title: 'Message Archived',
//                 content: 'Lorem ipsum dolor sit amet',
//             },
//             ariaLabel: 'Message archived',
//             className: 'w-[400px]',
//             autoClose: false,
//             closeButton: false,
//         });

//         toast(SplitButtons, {
//             closeButton: false,
//             className: 'p-0 w-[400px] border border-purple-600/40',
//             ariaLabel: 'Email received',
//         });

//         toast(Form, {
//             ariaLabel: 'Give feedback',
//         });

//         toast(OsxLike, {
//             className:
//                 'bg-zinc-900/40 backdrop-blur-lg shadow-inner shadow-zinc-600 border border-zinc-900/20 rounded-2xl text-white overflow-visible group',
//             closeButton: false,
//         });

//         toast(WithProgress, {
//             position: 'top-left',
//             autoClose: 8000,
//             customProgressBar: true,
//             closeButton: false,
//         });
//     };

//     return (
//         <div className="grid place-items-center h-dvh bg-zinc-950/80">
//             <button onClick={notify}>Notify !</button>
//             <ToastContainer autoClose={false} />
//         </div>
//     );
// }

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export function AuthToast({ data, toastProps }: CustomNotificationProps) {
  const isColored = toastProps.theme === "colored";

  return (
    <div className='flex w-full flex-col'>
      <h3
        className={`'text-sm font-inter', font-semibold ${isColored ? "text-white" : "text-zinc-800"} `}
      >
        {data.title}
      </h3>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>{data.content}</p>
        {/* <button
                    onClick={closeToast}
                    className={`
                        ml-auto transition-all text-xs  border rounded-md px-4 py-2 text-white active:scale-[.95],
                        ${isColored ? 'bg-transparent' : 'bg-zinc-900'}
                    `}
                >
                    Try again
                </button> */}
      </div>
    </div>
  );
}

export function WithAvatar() {
  return (
    <div className='flex flex-col pl-8'>
      <div className='absolute top-1/2 -left-12 z-10 grid size-20 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'>
        F
      </div>
      <p className='font-semibold text-white'>John Doe</p>
      <p className='text-sm text-zinc-400'>You have a new message from Fadi</p>
    </div>
  );
}

export function WithActions({ closeToast, data }: CustomNotificationProps) {
  return (
    <div className='flex w-full flex-col'>
      <h3 className='flex items-center gap-1 text-sm font-semibold text-zinc-800'>
        {data.title}
      </h3>

      <div className='mt-2 pl-5'>
        <p className='text-sm'>{data.content}</p>

        <div className='flex items-center gap-2'>
          <button
            onClick={closeToast}
            className='rounded-md border border-none bg-transparent py-2 text-sm font-semibold text-indigo-600 transition-all active:scale-[.95]'
          >
            Undo
          </button>
          <button
            onClick={closeToast}
            className='text-grey-400 rounded-md border border-none bg-transparent py-2 text-sm font-semibold transition-all active:scale-[.95]'
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export function SplitButtons({ closeToast }: ToastContentProps) {
  return (
    <div className='grid w-full grid-cols-[1fr_1px_80px]'>
      <div className='flex flex-col p-4'>
        <h3 className='text-sm font-semibold text-zinc-800'>Email Received</h3>
        <p className='text-sm'>You received a new email from somebody</p>
      </div>
      <div className='h-full bg-zinc-900/20' />
      <div className='grid h-full grid-rows-[1fr_1px_1fr]'>
        <button onClick={closeToast} className='text-purple-600'>
          Reply
        </button>
        <div className='w-full bg-zinc-900/20' />
        <button onClick={closeToast}>Ignore</button>
      </div>
    </div>
  );
}

export function Form({ closeToast }: ToastContentProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <h3 className='text-sm font-semibold text-zinc-800'>Feedback</h3>
      <p className='text-sm'>Your feedback is valuable</p>
      <form>
        <textarea className='h-[100px] w-full resize-none rounded-md border border-purple-600/40' />
      </form>
      <button onClick={closeToast}>Submit Feedback</button>
    </div>
  );
}

export function OsxLike({ closeToast }: ToastContentProps) {
  return (
    <div>
      <button
        className='absolute top-[-8px] left-[-6px] grid size-5 place-items-center rounded-full border border-zinc-400 bg-zinc-700/70 opacity-0 shadow-inner shadow-zinc-400 transition-opacity group-hover:opacity-100'
        onClick={closeToast}
      >
        <svg
          aria-hidden='true'
          viewBox='0 0 14 16'
          className={"size-3 fill-white"}
        >
          <path
            fillRule='evenodd'
            d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'
          />
        </svg>
      </button>
      <p>Hello hover me</p>
    </div>
  );
}

export function WithProgress({
  closeToast,
  isPaused,
  toastProps,
}: ToastContentProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <p>Custom Progress Bar</p>
      <svg
        width='40'
        height='40'
        viewBox='-25 -25 250 250'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        className='-rotate-90'
      >
        <circle
          r='90'
          cx='100'
          cy='100'
          fill='transparent'
          stroke='#e0e0e0'
          stroke-width='6'
          stroke-dasharray='565.48px'
          stroke-dashoffset='0'
        />
        <circle
          r='90'
          cx='100'
          cy='100'
          stroke='#76e5b1'
          stroke-width='16px'
          stroke-linecap='round'
          fill='transparent'
          stroke-dasharray='565.48px'
          // animation inside index.css
          className='radial-progress'
          onAnimationEnd={() => closeToast()}
          style={{
            animationDuration: `${toastProps.autoClose}ms`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </svg>
    </div>
  );
}
