#!/usr/bin/env python3
import http.server
import socketserver
import socket

PORT = 8080

def get_local_ip():
    """Get the local IP address"""
    try:
        # Create a socket to get the local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "localhost"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == "__main__":
    local_ip = get_local_ip()
    
    print("\n" + "=" * 40)
    print("🎓 College Events Management System")
    print("=" * 40)
    print(f"\n✅ Server is running!\n")
    print(f"📱 Access on this device:")
    print(f"   http://localhost:{PORT}")
    print(f"\n🌐 Access from other devices on your network:")
    print(f"   http://{local_ip}:{PORT}")
    print(f"\n" + "=" * 40 + "\n")
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped.")
