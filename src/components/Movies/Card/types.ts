import { MovieProps } from "@/types/Movies";

export type MovieCardProps = Omit<MovieProps, "id"> & {};
