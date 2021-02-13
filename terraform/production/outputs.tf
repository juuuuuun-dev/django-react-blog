output "public_subnet_ids" {
  value = module.vpc.public_subnets
}

output "http_sg_id" {
  value = module.https_sg.this_security_group_id
}
