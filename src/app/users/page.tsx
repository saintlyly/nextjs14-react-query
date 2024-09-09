import { dehydrate } from "@tanstack/query-core";
import ListUsers from "@/app/users/list-user";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUsers } from "@/app/utils/api-requests";

export default async function Users() {
  const queryClient = new QueryClient();
  

  await queryClient.prefetchQuery({
    queryKey: ["list-user"],
    queryFn: getUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers />
    </HydrationBoundary>
  );
}
