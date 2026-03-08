# ──────────────────────────────────────────────
# Terraform Variables
# ──────────────────────────────────────────────

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "devops-fullstack"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be development, staging, or production."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_public_key" {
  description = "SSH public key for EC2 access"
  type        = string
  # !! REPLACE with your actual SSH public key !!
  default = "ssh-rsa AAAAB3... your-public-key-here"
}

variable "ssh_allowed_cidr" {
  description = "CIDR blocks allowed for SSH access"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Restrict this in production!
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "your-domain.com"
}

variable "certbot_email" {
  description = "Email for Let's Encrypt SSL certificate"
  type        = string
  default     = "your-email@example.com"
}
