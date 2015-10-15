$script = <<SCRIPT
echo I am provisioning...

#https://github.com/nodesource/distributions
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs
cd /home/vagrant/src
npm install --no-bin-links

date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "puphpet/debian75-x64"
    # settings for VirtualBox provider (http://stackoverflow.com/a/29151109)
    config.vm.provider "virtualbox" do |v|
        v.customize ["sharedfolder", "add", :id, "--name", "src", "--hostpath", (("//?/" + File.dirname(__FILE__)).gsub("/","\\"))]
    end

    # call provisioner shell scripts
    config.vm.provision :shell, inline: "mkdir -p /home/vagrant/src"
    config.vm.provision :shell, inline: "mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` src /home/vagrant/src", run: "always"
    
    config.vm.provision "shell", inline: $script
end
