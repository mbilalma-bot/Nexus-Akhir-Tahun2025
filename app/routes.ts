import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("penyisihan", "routes/penyisihan.tsx"),
  route("final", "routes/final.tsx"),
  route("rekap", "routes/rekap.tsx"),
  route("telepati", "routes/telepati.tsx"),
  route("telepati/rekap", "routes/telepati-rekap.tsx"),
] satisfies RouteConfig;
