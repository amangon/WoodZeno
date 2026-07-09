"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

const handleCMSClick = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    router.push("/auth/login");
    return;
  }

  router.push("/cms");
};

  return (
    <header className="bg-[#0b1924] relative z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        {/* Desktop View */}
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">WoodZeno</span>
            <h1 className="text-4xl font-extrabold inline">
              <span
                className="bg-linear-to-b from-[#914402] via-[#c9a36a] to-[#b96d03] 
                   bg-clip-text text-transparent drop-shadow-lg"
              >
                Wood
              </span>
              <span
                className="ml-1 bg-linear-to-r from-[#eaeaea] via-[#b8b8b8] to-[#bababa]
                   bg-clip-text text-transparent drop-shadow-lg "
              >
                Zeno
              </span>
            </h1>

            {/* ToDo add an logo of company */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/home"
            className="relative text-md font-semibold text-white hover:text-rose-500 hover:scale-110 transition-transform hover:-translate-y-0.5 hover:duration-400 group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
          <Link
            href="/about"
            className="relative text-md font-semibold text-white hover:text-rose-500 hover:scale-110 transition-transform hover:-translate-y-0.5 hover:duration-400 group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
          <Link
            href="/products"
            className="relative group text-md font-semibold text-white hover:text-rose-500 hover:scale-110 transition-transform hover:-translate-y-0.5 hover:duration-400"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
          <Link
            href="/contact"
            className="relative group text-md font-semibold text-white hover:text-rose-500 hover:scale-110 transition-transform hover:-translate-y-0.5 hover:duration-400"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <button
  onClick={handleCMSClick}
  className="px-4 py-2 rounded-sm text-white bg-rose-500 hover:bg-rose-600 transition font-semibold"
>
  CMS
</button>
          <Button className="text-white bg-rose-500 group hover:bg-rose-600 group-hover:scale-105 transition duration-200 rounded-sm">
            <ShoppingCart size={30} />
            Order Now
          </Button>
        </div>
      </nav>

      {/* Mobile View */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">WoodZeno</span>
              {/* Add logo of the company */}
              <h1 className="text-4xl font-extrabold inline">
                <span
                  className="bg-linear-to-b from-[#914402] via-[#c9a36a] to-[#b96d03] 
                   bg-clip-text text-transparent drop-shadow-lg"
                >
                  Wood
                </span>
                <span
                  className="ml-1 bg-linear-to-r from-[#eaeaea] via-[#b8b8b8] to-[#bababa]
                   bg-clip-text text-transparent drop-shadow-lg "
                >
                  Zeno
                </span>
              </h1>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  About
                </Link>
                <Link
                  href="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Product
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                <Button className="text-white bg-rose-500 lg:bg-rose-500 md:bg-rose-500 hover:bg-rose-600 rounded-sm">
                  <ShoppingCart size={30} />
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
