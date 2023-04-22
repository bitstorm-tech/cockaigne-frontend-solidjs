// @refresh reload
import { useNavigate } from "@solidjs/router";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from "solid-start";
import Footer from "~/components/navigation/Footer";
import Header from "~/components/navigation/Header";
import { loadAccount } from "~/lib/stores/account-store";
import sessionStore from "~/lib/stores/session-store";
import "./root.css";

export default function Root() {
  const navigate = useNavigate();
  if (!sessionStore.userId) {
    navigate("/");
  } else {
    loadAccount().then();
  }

  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <Title>Cockaigne City</Title>
        <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </Head>
      <Body>
        <Header />
        <ErrorBoundary>
          <main class="pb-12">
            <Routes>
              <FileRoutes />
            </Routes>
          </main>
        </ErrorBoundary>
        <Footer />
        <Scripts />
      </Body>
    </Html>
  );
}
