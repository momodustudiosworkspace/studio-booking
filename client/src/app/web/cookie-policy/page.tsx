export default function CookiePolicyPage() {
  return (
    <div className='mx-auto max-w-4xl px-6 py-12 pt-64 text-gray-800'>
      <h1 className='mb-6 text-3xl font-bold'>Cookie Policy</h1>

      <p className='mb-4'>
        This Cookie Policy explains how we use cookies and similar technologies
        to recognize you when you visit our website.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>What are cookies?</h2>
      <p className='mb-4'>
        Cookies are small text files stored on your device when you visit a
        website. They help improve functionality and user experience.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>
        Types of cookies we use
      </h2>

      <ul className='list-disc space-y-2 pl-6'>
        <li>
          <strong>Necessary cookies:</strong> Required for basic site functions
          like authentication and security.
        </li>
        <li>
          <strong>Analytics cookies:</strong> Help us understand how users
          interact with our site.
        </li>
        <li>
          <strong>Preference cookies:</strong> Remember your settings and
          preferences.
        </li>
      </ul>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>Managing cookies</h2>
      <p className='mb-4'>
        You can control or delete cookies through your browser settings. You can
        also update your cookie preferences on our site at any time.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-semibold'>Contact us</h2>
      <p>
        If you have questions about this Cookie Policy, contact us at{" "}
        <strong>admin@momodustudios.com</strong>.
      </p>
    </div>
  );
}
