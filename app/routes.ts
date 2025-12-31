import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("penyisihan", "routes/penyisihan.tsx"),
  route("final", "routes/final.tsx"),
  route("rekap", "routes/rekap.tsx"),
  route("telepati", "routes/telepati.tsx"),
  route("telepati/rekap", "routes/telepati-rekap.tsx"),
  route("color-battle", "routes/color-battle.tsx"),
  route("games-berantai", "routes/games-berantai.tsx"),
  route("rekap-akhir", "routes/rekap-akhir.tsx"),
] satisfies RouteConfig;
