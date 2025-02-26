"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WelcomeSection from './components/Welcome';
import ExploreSection from './components/Explore';
import HeroSection from './components/Hero';

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    return (
      <div>
        <div className="flex flex-col items-center justify-between">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
              <HeroSection/>
              <WelcomeSection/>
              <ExploreSection/>


            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Login
              </Link>
            </div>
            
          )}
        </div>
      </div>
    );
}
