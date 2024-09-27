import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {ClerkProvider} from "@clerk/clerk-react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider, createRouter} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {ToastContainer, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const router = createRouter({routeTree});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router}/>
        <ToastContainer
          toastClassName={() => "bg-base-300 p-3 rounded-2xl"}
          position="bottom-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          transition={Bounce}
          closeButton={false}/>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>
);
