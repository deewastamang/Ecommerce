import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {toast} from "sonner"
import unknownUserIcon from "@/../../public/assets/images/unknownUser.png"
import { usePathname } from "next/navigation";

const ProfileDropDown = ({ user }) => {
  const pathname = usePathname();
    const handleSignOut = () => {
        signOut();
        toast.success("Logged Out successfully", {
          duration: 5000,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss()
          }
        })
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          className="rounded-full object-cover bg-slate-400/20"
          src={user?.image || unknownUserIcon}
          alt="profile image"
          width={50}
          height={50}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-slate-200/80 rounded-[4px]'>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=""><Link href="/profile" className={pathname === "/profile" ? "text-orange-600" : "w-full hover:text-orange-400"}>Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/wishlist" className={pathname === "/wishlist" ? "text-orange-600" : "w-full hover:text-orange-400"}>Wishlist</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/order" className={pathname === "/order" ? "text-orange-600" : "w-full hover:text-orange-400"}>Order</Link></DropdownMenuItem>
        <DropdownMenuItem>Theme: Light</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={handleSignOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
