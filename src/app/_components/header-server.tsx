import HeaderClient from "./header-client";

export default function HeaderServer() {
  return (
    <header className="fixed top-8 flex w-full items-center justify-center">
      <HeaderClient />
    </header>
  );
}
