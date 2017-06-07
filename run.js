
chrome.storage.sync.get({
    ignore_subdomains: true
  }, function(items) {
    ignore_subdomains = items.ignore_subdomains;
    run(ignore_subdomains);
  });

function run(ignore_subdomains) {
	// common regex
	var protocol_regex = "(?:https?|file)://(?:/)?";
	// only domain
	var tld_domain_regex_capture = "([^\\.]*\\.[^/]*)";
	var ignore_subdomains_regex = "(?:[^\\.]*\\.)?";
	var tld_domain_subdomain_regex_capture = "((?:[^\\.]*\\.)?[^\\.]*\\.[^/]*)";

	// pattern
	var domain_pattern_string = protocol_regex + ignore_subdomains_regex + (tld_domain_regex_capture) + "/.*";
	var subdomain_pattern_string = protocol_regex + tld_domain_subdomain_regex_capture + "/.*";

	// url pattern to replace target at
	var url_pattern_string;
	if(ignore_subdomains == true) {
		url_pattern_string = domain_pattern_string;
	} else {
		url_pattern_string = subdomain_pattern_string;
	}

	console.log("url pattern: " + url_pattern_string);

	var url_pattern = new RegExp(url_pattern_string);
	var match = url_pattern.exec(document.URL);
	var domain = match[1];

	var allow_subdomains_pattern_string = "([^.]*\\.)?";
	var prefix_pattern = "";
	if(ignore_subdomains == true) {
		prefix_pattern = allow_subdomains_pattern_string;
	}

	console.log("URL: " + domain);

	var filter_pattern = new RegExp(protocol_regex + prefix_pattern + domain + "/.*");

	$("a").each(function() {
		if(!filter_pattern.test(this.href) && url_pattern.test(this.href)) {
			console.log("no match: " + this.href + ", target: " + this.target);
			this.target="_blank";
		}
	});
}