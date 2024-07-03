import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths?.split('/').filter(path => path);
  const remainingPathNames =
    pathNames?.length > 2
      ? pathNames.slice(pathNames.length - 2, pathNames.length)
      : pathNames;

  if (!pathNames || pathNames.length === 0) return null;

  return (
    <div className="px-4 pt-5 md:px-10">
      <div className="relative flex flex-row flex-wrap items-center gap-1.5">
        <div>
          <Link href="/" className={classNames('text-reeceBlue underline')}>
            <label className="small">Home</label>
          </Link>
        </div>
        {pathNames.length > 0 && (
          <span className="material-icons text-xl text-textSubtle">
            chevron_right
          </span>
        )}
        {pathNames.length > 2 && (
          <React.Fragment>
            <div>
              <Menu>
                <MenuButton
                  className={classNames(
                    'appearance-none text-reeceBlue underline',
                  )}
                >
                  ...
                </MenuButton>
                <Transition
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-300 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <MenuItems
                    anchor="bottom start"
                    className="z-10 -ml-16 mt-4 origin-top space-y-3 rounded-md border border-neutral-200 bg-white px-4 py-3 shadow-breadcrumb transition"
                  >
                    {pathNames
                      .slice(0, pathNames.length - 2)
                      .map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}/`;
                        const itemLink =
                          link[0].toUpperCase() +
                          link.slice(1, link.length).replaceAll('-', ' '); // Capitalize

                        return (
                          <MenuItem key={index}>
                            <Link
                              href={href}
                              className={classNames(
                                'block',
                                paths === href
                                  ? 'text-textSubtle'
                                  : 'text-reeceBlue underline',
                              )}
                            >
                              <label className="small">{itemLink}</label>
                            </Link>
                          </MenuItem>
                        );
                      })}
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
            <span className="material-icons text-xl text-textSubtle">
              chevron_right
            </span>
          </React.Fragment>
        )}
        {remainingPathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1 + (pathNames.length > 2 ? pathNames.length - 2 : 0)).join('/')}/`;
          const itemLink =
            link[0].toUpperCase() +
            link.slice(1, link.length).replaceAll('-', ' '); // Capitalize

          return (
            <React.Fragment key={index}>
              <div>
                {paths === href ? (
                  <label className="small text-textSubtle">{itemLink}</label>
                ) : (
                  <Link href={href} className="text-reeceBlue underline">
                    <label className="small">{itemLink}</label>
                  </Link>
                )}
              </div>
              {remainingPathNames.length !== index + 1 && (
                <span className="material-icons text-xl text-textSubtle">
                  chevron_right
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
