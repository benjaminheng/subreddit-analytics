$script = <<SCRIPT
echo I am provisioning...

#https://github.com/nodesource/distributions
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs
cd /home/vagrant/project
npm install --no-bin-links

npm install -g gulp

date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "puphpet/debian75-x64"
    # settings for VirtualBox provider (https://github.com/renobit/vagrant-node-env/blob/5d4b0be87a6fe9410c5ccd038c9344aad710ef0f/Vagrantfile)
    config.vm.provider "virtualbox" do |v, override|
        if Vagrant::Util::Platform.windows?
            override.vm.synced_folder "./", "/home/vagrant/project", disabled: true
            v.customize ["sharedfolder", "add", :id, "--name", "project", "--hostpath", (("//?/" + File.dirname(__FILE__)).gsub("/","\\"))]
        else
            override.vm.synced_folder "./", "/home/vagrant/project"
        end
    end

    # if on windows, mount custom shared folder
    if Vagrant::Util::Platform.windows?
        config.vm.provision :shell, inline: "mkdir -p /home/vagrant/project"
        config.vm.provision :shell, inline: "mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` project /home/vagrant/project", run: "always"
    end

    # call provisioner shell scripts
    config.vm.provision "shell", inline: $script
end
