# PostToHub
a fast way to transfer your current tab to your Nest-Hub using CATT

Introducing PostToHub - the handy system that empowers Home Assistant users to effortlessly send their browsing tabs directly to their Google Nest Hub with a simple browser extension. Say goodbye to the hassle of manually sharing links and hello to the convenience of seamless integration. With PostToHub, you can easily curate your browsing experience and enhance your smart home setup all at once. 

## Dependencies
- Home Assistant with CATT
- Chrome-Extension compatible Browser
  : https://chromewebstore.google.com/detail/posttohub/kjpoelcmdpgknokmingkjojpofnonbhb

## Installation of CATT
1. use the terminal addon from Home assistant
2. run the command `pip3 install catt` um CATT zu installieren

### Make CATT available even if the Home Assistant Core was updated
1. Edit Home Assitant's `configuration.yml`-File
2. Add this block to it:

```yml
shell_command:
  catt_install: "pip3 install catt"
  ```
  
3. Now create an automation with the trigger `When Home Assistant is started` in Home Assistant that runs the service `Shell Command: 'catt_install'`

## Making Home Assistant ready to receive URLs
1. Create a helper with type "input_text" and name it e.g. nest_cast_url
2. Add the following command to cast to the Home Assistant Configuration-File, so it looks like this.

Here you need to replace "Nest Hub" with the Name of your Nest Hub.
```yml
shell_command:
  catt_install: "pip3 install catt"
  cast_site_to_nest: 'catt -d "Nest Hub" cast_site {{ states("input_text.nest_cast_url") }}'
  ```
3. Restart Home Assistant
4. Create a new automation and switch to the YAML-Editor with the three dots at the top right and replace the content with this:

Note: Please change the Webhook-ID to something less recognizable, especially if you exposed Home Assistant from your Network.
```yml
alias: View on Nest
description: "Cast URL to Nest Hub"
trigger:
  - platform: webhook
    webhook_id: ouJKgVPedfUv7xicQF9k
condition: []
action:
  - service: input_text.set_value
    data:
      value: "{{ trigger.json.url }}"
    target:
      entity_id: input_text.nest_cast_url
  - service: shell_command.cast_site_to_nest
    data: {}
mode: single
```
6. Try it out. :D

## Client Setup (Apple Plattforms)
1. Import [this](https://www.icloud.com/shortcuts/22debfedcfbd4be085eb7f753b9f6a4b) shortcut to your Shortcuts App
2. Edit the Shortcut and change the URL-Objects Value to something like this: 

```http://<address of your home assistant instance>[<port>]/api/webhook/<your webhook-id>```

3. Ready. You can now share URLs with the shortcut, across the System, even in Apps. :)

## Chrome Extension Setup
1. Install the extension
2. Right click on the icon and go to "Options"
3. Place your Webhook URL in there.
It schould look something like this:

```http://<address of your home assistant instance>[<port>]/api/webhook/<your webhook-id>```

4. Try it out. :D
