import {RedirectToast} from "../components/redirect-toast";

type RootTemplateProps = {
    children: React.ReactNode
};

export default function RootTemplate({
    children
}: RootTemplateProps) 
{
    return (
        <html>
            <body>{children}</body>
            <RedirectToast />
        </html>
    );
}