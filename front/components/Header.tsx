"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAuthStore from "@/stores/auth";

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="mb-24">
      <div className="flex justify-between items-center container mx-auto py-8">
        <Link href="/">
          <h1 className="text-xl font-bold">Padel Horizon tournois</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Demande de licence</Link>
            </li>
            {!user && (
              <>
                <li>
                  <Button variant="outline" asChild>
                    <Link href="/signup">Inscription</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="default" asChild>
                    <Link href="/login">Connexion</Link>
                  </Button>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/me">Mon profil</Link>
                </li>
                <li>
                  <Button variant="outline" onClick={logout}>
                    Déconnexion
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
