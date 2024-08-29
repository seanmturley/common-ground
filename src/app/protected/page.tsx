import AuthButton from "@components/AuthButton";

export default function ProtectedPage() {
  return (
    <section>
      <div>
        This is a protected page that you can only see as an authenticated user
      </div>
      <nav>
        <AuthButton />
      </nav>
    </section>
  );
}
