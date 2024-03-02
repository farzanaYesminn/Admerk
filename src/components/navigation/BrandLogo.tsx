import logo from "assets/logos/cover.png";
import { Image, type ImageProps } from "@chakra-ui/react";

type Props = ImageProps;

export default function BrandLogo(props: Props) {
    return <Image src={logo} {...props} fit="contain" alt="brand-logo" />;
}
