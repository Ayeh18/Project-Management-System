import Logo from "@/assets/ProMa.png";

export default function ApplicationLogo({ className }) {
    return (
        <img
            src={Logo}
            alt="ProMa Logo"
            className={className ?? "h-16 w-auto"}
        />
    );
}
