"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { FormControl, IconButton, Menu, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { locales } from "@/i18n/routing"; // Nhập danh sách locales từ routing.ts
import { useTranslations } from "next-intl";
import { SelectChangeEvent } from "@mui/material/Select";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const localeActive = useLocale();
  const t = useTranslations("language"); // Hook dịch của next-intl

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    const nextLocale = e.target.value; // Kiểu value là string
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
    handleMenuClose(); // Đóng menu sau khi thay đổi ngôn ngữ
  };

  return (
    <div>
      <FormControl sx={{ marginLeft: "15px" }} variant="outlined" size="small">
        <IconButton
          onClick={handleMenuOpen}
          disabled={isPending} // Vô hiệu hóa icon khi đang chuyển đổi ngôn ngữ
        >
          <TranslateIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              maxHeight: 200, // Giới hạn chiều cao của menu
            },
          }}
        >
          {locales.map((locale) => (
            <MenuItem
              key={locale}
              value={locale}
              selected={locale === localeActive}
              onClick={() =>
                onSelectChange({
                  target: { value: locale },
                } as SelectChangeEvent<string>)
              } // Tạo sự kiện giả để chuyển đổi ngôn ngữ
            >
              {t(locale)} {/* Dịch tên ngôn ngữ */}
            </MenuItem>
          ))}
        </Menu>
      </FormControl>
    </div>
  );
}
