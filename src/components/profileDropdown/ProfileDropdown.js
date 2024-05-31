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

const ProfileDropDown = ({ user }) => {
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
          className="rounded-full object-cover"
          src={user.image}
          alt="profile image"
          width={50}
          height={50}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-slate-200/90 rounded-[4px]'>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href="/profile" className="w-full">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/wishlist" className="w-full">Wishlist</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/order" className="w-full">Order</Link></DropdownMenuItem>
        <DropdownMenuItem>Theme: Light</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={handleSignOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
