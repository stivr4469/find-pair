#!/bin/bash
#запустите на сервере с правами суперпользователя (sudo ./install_node_exporter.sh).
# Скачиваем архив Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.8.0/node_exporter-1.8.0.linux-amd64.tar.gz

# Распаковываем архив
tar xvfz node_exporter-1.8.0.linux-amd64.tar.gz

# Переходим в директорию с распакованным Node Exporter
cd node_exporter-1.8.0.linux-amd64/

# Перемещаем исполняемый файл в /usr/bin
sudo mv node_exporter /usr/bin/

# Создаем пользователя без пароля
sudo useradd -rs /bin/false node_exporter

# Задаем владельца для исполняемого файла
sudo chown node_exporter:node_exporter /usr/bin/node_exporter

# Создаем файл для службы Node Exporter
sudo tee /etc/systemd/system/node_exporter.service > /dev/null <<EOF
[Unit]
Description=Prometheus Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
Restart=on-failure
ExecStart=/usr/bin/node_exporter --web.listen-address=:9100

[Install]
WantedBy=multi-user.target
EOF

# Перезагружаем демон systemd
sudo systemctl daemon-reload

# Запускаем Node Exporter
sudo systemctl start node_exporter

# Включаем автозапуск Node Exporter при загрузке системы
sudo systemctl enable node_exporter

# Проверяем статус Node Exporter
sudo systemctl status node_exporter

# Выводим версию Node Exporter
node_exporter --version

