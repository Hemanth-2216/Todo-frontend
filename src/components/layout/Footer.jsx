const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0" style={{ fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Todo App | Built with ❤️ by Hemanth
      </p>
    </footer>
  );
};

export default Footer;
