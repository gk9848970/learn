import { useQuery } from "@tanstack/react-query";

const useMediaDevices = () => {
  return useQuery({
    queryKey: ["media-devices"],
    queryFn: () => navigator.mediaDevices.enumerateDevices(),
  });
};

const Loading = () => {
  return <div>Loading...</div>;
};

const Error = () => {
  return <div>Oops! Error</div>;
};

export function Lifecycle() {
  const { data, isPending, isError } = useMediaDevices();

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      {data.map((device) => (
        <div key={device.deviceId}>{device.kind}</div>
      ))}
    </div>
  );
}
