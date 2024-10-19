
import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center py-4 bg-white bg-opacity-80 shadow-md px-[15%]">
      <div>
        <a href="/">
          <Image src='/images/dtg.webp' width={200} height={100} alt="logo" />
        </a>
      </div>
      <div className="flex flex-row gap-5">
        <a href='/posts' className="font-bold text-xl">Blog</a>
        <a href='/' className="font-bold text-xl">Contact</a>
      </div>
      <div>
        {!session ? (
          <a href="/auth/signin">
            <button className="font-bold text-xl">Admin</button>
          </a>
        ) : (
          <form action={handleSignOut}>
            <button type="submit" className="font-bold text-xl">
              Sign Out
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
