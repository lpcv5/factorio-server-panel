import { Card, CardBody, Button, ButtonGroup } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useState } from "react";


export default function Navbar() {
  const [selected, setSelect] = useState("服务器状态")
  return (
    <nav className="flex w-full justify-center">
      <Card>
        <CardBody>
          <ButtonGroup variant="flat" radioGroup="sm">
            {siteConfig.navItems.map((item) => (
              <Button
                href={item.href}
                radius="sm"
                as={Link}
                color={selected === item.label ? "success" : "default"}
                onPress={() => setSelect(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </CardBody>
      </Card>
    </nav>
  );
}
