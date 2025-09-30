export const sidebarStyles = {
  container: 'flex h-screen w-sidebar flex-col gap-2.5 border-r border-gray-90 bg-gray-96',
  mainContent: 'flex flex-1 flex-col py-6',
  bottomSection: 'flex flex-col py-6',

  // Profile Section
  profileSection: 'flex flex-col gap-2.5',
  profileIconWrapper: 'px-4',

  // User Info
  userInfoContainer: 'flex max-w-sidebar-content flex-col items-start justify-center gap-3 self-stretch px-5 py-3',
  userName: 'self-stretch text-2xl font-medium leading-[160%] text-black',
  userBio: 'self-stretch text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-20',

  // Quote (Not Logged In)
  quoteContainer: 'px-5 py-3',
  quoteText: 'text-sm font-light text-gray-20',

  // Buttons
  buttonContainer: 'px-4',
  buttonGroup: 'flex gap-2.5',
  sidebarButton: 'w-sidebar-button',
} as const;
