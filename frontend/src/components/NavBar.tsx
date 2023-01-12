import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconSchool,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Inicio", route: "/" },
  { icon: IconUser, label: "Estudiantes", route: "/students" },
  { icon: IconSchool, label: "Maestros", route: "/teachers" },
  { icon: IconCalendarStats, label: "Horarios", route: "/schedule" },
  { icon: IconSettings, label: "Settings", route: "/settings" },
];

export function NavbarMinimalColored() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <Link key={link.route} to={link.route}>
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  return (
    <Navbar
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
      })}
    >
      <Navbar.Section grow>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
