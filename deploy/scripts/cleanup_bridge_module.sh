#!/bin/bash

set -e
set -u

# Prompt user for sudo password upfront
sudo -v
echo "Cleaning up bridge kernel module and sysctl settings..."

# Revert sysctl settings
sudo sysctl -w net.bridge.bridge-nf-call-iptables=0 || true
sudo sysctl -w net.bridge.bridge-nf-call-ip6tables=0 || true

# Remove settings from /etc/sysctl.conf
sudo sed -i '/^net.bridge.bridge-nf-call-iptables=1$/d' /etc/sysctl.conf
sudo sed -i '/^net.bridge.bridge-nf-call-ip6tables=1$/d' /etc/sysctl.conf

# Reload sysctl settings
echo "Reloading sysctl settings..."
sudo sysctl -p

# Unload the bridge kernel module if no containers require it
if ! docker ps -q | grep -q .; then
  echo "No Docker containers running. Unloading br_netfilter module..."
  sudo modprobe -r br_netfilter || true
else
  echo "Docker containers are running. Keeping br_netfilter module loaded."
fi

echo "Cleanup of bridge kernel module and sysctl settings completed."
