module Client
  def client(page)
    if Rails.env == 'production'
      [client_versioned_style(page), client_versioned_script(page)].join("\n")
    else
      include_page(page)
    end
  end
  
  def include_page(page)
    File.read(File.join(Rails.root, 'app', 'client', page, 'index.html')).html_safe
  end

  def client_version
    client_version = SynergyEoc::CLIENT_PACKAGE['version']
  end

  def client_versioned_style(page)
    stylesheet_link_tag "http://example.com/#{client_version}/#{page}.css"
  end

  def client_versioned_script(page)
    javascript_include_tag "http://example.com/#{client_version}/#{page}.js"
  end
end