# ──────────────────────────────────────────────
# Terraform Outputs
# ──────────────────────────────────────────────

output "instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.app_server.id
}

output "instance_public_ip" {
  description = "EC2 Instance Public IP (Elastic IP)"
  value       = aws_eip.app_eip.public_ip
}

output "instance_public_dns" {
  description = "EC2 Instance Public DNS"
  value       = aws_instance.app_server.public_dns
}

output "security_group_id" {
  description = "Security Group ID"
  value       = aws_security_group.app_sg.id
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ~/.ssh/${var.project_name}-key ec2-user@${aws_eip.app_eip.public_ip}"
}

output "app_url" {
  description = "Application URL"
  value       = "https://${var.domain_name}"
}
