import Link from "next/link";
import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center py-4 bg-white bg-opacity-80 shadow-md px-[15%]">
      <div>
        <Link href="/">
          <Image src='/images/dtg.webp' width={200} height={100} alt="logo" />
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <Link href='/posts' className="font-bold text-xl">Blog</Link>
        <Link href='/' className="font-bold text-xl">Contact</Link>
      </div>
      <div>
        {!session ? (
          <Link href="/auth/signin">
            <button className="font-bold text-xl">Admin</button>
          </Link>
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
