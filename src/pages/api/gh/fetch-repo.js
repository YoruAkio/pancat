export default async function handler(req, res) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const orgName = "pancatdev"; // Your organization name
    
    // Using GitHub GraphQL API to fetch featured repositories
    const query = `
      query {
        organization(login: "${orgName}") {
          repositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
              repositoryTopics(first: 4) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              openGraphImageUrl
            }
          }
        }
      }
    `;

    console.log("Sending request to GitHub GraphQL API");

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Note: Changed from "bearer" to "Bearer"
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API response not OK:", response.status, errorText);
      throw new Error(`Failed to fetch repositories: ${response.status} ${errorText}`);
    }
    
    const responseData = await response.json();
    
    if (responseData.errors) {
      console.error("GraphQL errors:", responseData.errors);
      throw new Error(responseData.errors[0].message);
    }
    
    // Process repositories from the organization
    const repos = responseData.data?.organization?.repositories?.nodes || [];
    
    // Format the data for our frontend
    const formattedRepos = repos.map(repo => ({
      name: repo.name,
      description: repo.description || `A project from ${orgName}`,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      tags: [
        repo.primaryLanguage?.name,
        ...(repo.repositoryTopics?.nodes?.map(node => node.topic.name) || [])
      ].filter(Boolean),
      image: repo.openGraphImageUrl || `/project-previews/${repo.name.toLowerCase()}.png`,
      stars: repo.stargazerCount,
      forks: repo.forkCount
    }));
    
    console.log(`Successfully fetched ${formattedRepos.length} repositories`);
    res.status(200).json(formattedRepos);
  } catch (error) {
    console.error("Error in GitHub API handler:", error);
    res.status(500).json({ 
      error: "Failed to fetch repositories",
      message: error.message
    });
  }
}