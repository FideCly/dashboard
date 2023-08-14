export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 w-full lg:mx-auto lg:px-8">
      <div className="flex items-center h-16 px-4 border-b border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex self-stretch gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6 ">
            <div className="flex items-center "></div>
            <div className="flex-1 lg:block lg:h-6 lg:w-px"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
