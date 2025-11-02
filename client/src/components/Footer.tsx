export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Built and designed by <span className="text-primary">Fardin Hossain</span>.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          All rights reserved. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
