import { Card, CardBody, Button, ButtonGroup } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex w-full justify-center">
      <Card>
        <CardBody>
          <ButtonGroup variant="flat" radioGroup="sm">
            {siteConfig.navItems.map((item) => (
              <Button href={item.href} as={Link}>
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </CardBody>
      </Card>
    </nav>
  );
};
