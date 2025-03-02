import { useQuery } from "@tanstack/react-query";

export const DevicesComponent = () => {
  const devices = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      return navigator.mediaDevices.enumerateDevices();
    },
  });

  return (
    <div>
      <h1>Devices</h1>

      {devices.isLoading && <div>Loading</div>}
      {devices.isError && <div>Error</div>}
      {devices.isSuccess && <div>{devices.data.length} Available</div>}
    </div>
  );
};
